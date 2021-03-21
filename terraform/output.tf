output "distribution_id" {
  value = aws_cloudfront_distribution.cloudfront_distribution.id
}

output "distribution_arn" {
  value = aws_cloudfront_distribution.cloudfront_distribution.arn
}

output "distribution_domain_name" {
  value = aws_cloudfront_distribution.cloudfront_distribution.domain_name
}
