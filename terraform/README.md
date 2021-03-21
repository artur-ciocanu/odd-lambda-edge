# Background
We use Terraform to provision all the necessary infrastructure elements. 

# Creating resources
There are a few resources that we need to be able expose AWS Lambda as HTTP endpoint via CloudFront:
- AWS Lambda function
- AWS S3 bucket
- AWS Cloudfront distribution

Every resource has it's own details, so please check the `main.tf` file for details. The `Teerraform` variable values can be found in `dev.tfvars`. Feel free to change the values to whatever you want when running the code.

To be able to run `Terraform` we need AWS credentials please refer to official `Terraform` docs that can be found [here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) on how to configure the AWS credentials. Once everything is setup you could the following commands to provision your infrastructure:
1. Init `Terraform`:
```bash
$ terraform init
```
2. Review the `Terraform` plan:
```bash
$ terraform plan -var-file=dev.tfvars -out dev.tfplan
```
3. Apply the changes
```bash
terraform apply "dev.tfplan"`
```

# Destroying resources
Once you are done with your testing you could destroy the infrastructure by running:
```bash
$ terraform destroy -var-file=dev.tfvars
```
