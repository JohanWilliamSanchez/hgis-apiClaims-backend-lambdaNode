// src/lambdas/claims/index.js
exports.handler = async (event) => {
    const httpMethod = event.httpMethod;
    const path = event.path;
    const resource = event.resource;
    
    console.log(`Processing ${httpMethod} request for path: ${path}`);
    
    // Simulación de respuestas para cumplir con la prueba técnica
    let responseBody = {};
    let statusCode = 200;

    try {
        if (resource === "/api/v1/claims" && httpMethod === "POST") {
            const body = JSON.parse(event.body || "{}");
            responseBody = {
                message: "Siniestro registrado exitosamente",
                claimId: `clm-${Math.random().toString(36).substr(2, 9)}`,
                data: body,
                timestamp: new Date().toISOString()
            };
            statusCode = 201;
        } 
        else if (resource === "/api/v1/claims/{id}" && httpMethod === "GET") {
            const id = event.pathParameters.id;
            responseBody = {
                id: id,
                policyNumber: "POL-123456",
                insuredName: "Juan Pérez (Datos protegidos SFC/PII)",
                status: "En proceso de revisión",
                description: "Choque simple en la Calle 22 con Carrera 15, Bogotá",
                createdAt: new Date().toISOString()
            };
        } 
        else if (resource === "/api/v1/claims/{id}" && httpMethod === "PATCH") {
            const id = event.pathParameters.id;
            const body = JSON.parse(event.body || "{}");
            responseBody = {
                message: `Siniestro ${id} actualizado correctamente`,
                updatedFields: body,
                updatedAt: new Date().toISOString()
            };
        } 
        else {
            statusCode = 404;
            responseBody = { message: "Ruta no encontrada en el módulo de reclamaciones" };
        }
    } catch (error) {
        statusCode = 500;
        responseBody = { error: "Error interno del servidor", details: error.message };
    }

    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // Requerido para evitar problemas de CORS con el Frontend en React
        },
        body: JSON.stringify(responseBody)
    };
};