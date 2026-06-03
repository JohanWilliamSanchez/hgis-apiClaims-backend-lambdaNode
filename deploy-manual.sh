# 3. Actualiza el código de la Lambda en AWS
aws lambda update-function-code \
  --function-name ins-claims-function-manual \
  --zip-file fileb://index.zip \
  --profile claimHistory \
  --region us-east-1

# 4. (Opcional) Limpia el archivo local creado
rm index.zip