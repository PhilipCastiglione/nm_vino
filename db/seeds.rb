puts; puts "SEEDING DATA FOR APP"
puts; puts "SEED: Please contact the developer with any issues."
puts; puts "SEED: Purging database!"
puts;
puts "SEED: Purging #{ Disease.destroy_all } Diseases"
puts "SEED: Purging #{ MetricCategory.destroy_all } Metric Categories"
puts "SEED: Purging #{ Metric.destroy_all } Metrics"
puts "SEED: Purging #{ MetricDetail.destroy_all } Metric Details"
puts;

diseases.each { |d| Disease.create(d) }
metric_categories.each { |mc| MetricCategory.create(mc) }
metrics.each { |m| Metric.create(m) }
metric_details.each { |md| MetricDetail.create(md) }

puts "SEED: Created #{ Disease.count } Diseases"
puts "SEED: Created #{ MetricCategory.count } Metric Categories"
puts "SEED: Created #{ Metric.count } Metrics"
puts "SEED: Created #{ MetricDetail.count } Metric Details"
