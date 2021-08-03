https://github.com/andrewmatveychuk/azure.linked-arm-templates

# Overall resources
## certificates and domains
### Key Vault permissions
By default, 'Microsoft.CertificateRegistration' and 'Microsoft.Web' RPs don't have access to the Key Vault specified in the template hence you need to authorize these RPs by executing the following PowerShell commands before deploying the template:
Login-AzureRmAccount
Set-AzureRmContext -SubscriptionId AZURE_SUBSCRIPTION_ID
Set-AzureRmKeyVaultAccessPolicy -VaultName KEY_VAULT_NAME -ServicePrincipalName f3c21649-0979-4721-ac85-b0216b2cf413 -PermissionsToSecrets get,set,delete
Set-AzureRmKeyVaultAccessPolicy -VaultName KEY_VAULT_NAME -ServicePrincipalName abfa0a7c-a6b6-4736-8310-5855508787cd -PermissionsToSecrets get

## resource groups
One resource group for the certificates, key-vault and domain configuration.
All other apps have their own resource group.

## storage for deploy templates
