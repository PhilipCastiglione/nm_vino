puts; puts "SEEDING DATA FOR APP"
puts; puts "SEED: Please contact the developer with any issues."
puts; puts "SEED: Purging database!"
puts;
puts "SEED: Purging #{ Measure.destroy_all.count } Measures"
puts "SEED: Purging #{ Disease.destroy_all.count } Diseases"
puts "SEED: Purging #{ MetricCategory.destroy_all.count } Metric Categories"
puts "SEED: Purging #{ Metric.destroy_all.count } Metrics"
puts "SEED: Purging #{ MetricDetail.destroy_all.count } Metric Details"
puts "SEED: Purging #{ MetricSubdetail.destroy_all.count } Metric Subdetails"
puts;

combined = Measure.create!(title: "Combined")

cn = MetricCategory.create!(title: "Cranial Nerve")
eye = Metric.create!(title: "Eye Closure", metric_category: cn)
MetricDetail.create!(description: "no visible closure", score: 0, metric: eye)
MetricDetail.create!(description: "severe weakness (>50% loss)", score: 1, metric: eye)
MetricDetail.create!(description: "slight weakness (<50% loss)", score: 2, metric: eye)
MetricDetail.create!(description: "normal", score: 3, metric: eye)
lip = Metric.create!(title: "Lip Closure", metric_category: cn)
MetricDetail.create!(description: "no visible closure", score: 0, metric: lip)
MetricDetail.create!(description: "severe weakness (>50% loss)", score: 1, metric: lip)
MetricDetail.create!(description: "slight weakness (<50% loss)", score: 2, metric: lip)
MetricDetail.create!(description: "normal", score: 3, metric: lip)
jaw = Metric.create!(title: "Jaw Closure", metric_category: cn)
MetricDetail.create!(description: "no visible closure", score: 0, metric: jaw)
MetricDetail.create!(description: "severe weakness (>50% loss)", score: 1, metric: jaw)
MetricDetail.create!(description: "slight weakness (<50% loss)", score: 2, metric: jaw)
MetricDetail.create!(description: "normal", score: 3, metric: jaw)
neck_f = Metric.create!(title: "Neck Flexion", metric_category: cn)
MetricDetail.create!(description: "no visible flexion", score: 0, metric: neck_f)
MetricDetail.create!(description: "severe weakness (>50% loss)", score: 1, metric: neck_f)
MetricDetail.create!(description: "slight weakness (<50% loss)", score: 2, metric: neck_f)
MetricDetail.create!(description: "normal", score: 3, metric: neck_f)
neck_e = Metric.create!(title: "Neck Extension", metric_category: cn)
MetricDetail.create!(description: "no visible extension", score: 0, metric: neck_e)
MetricDetail.create!(description: "severe weakness (>50% loss)", score: 1, metric: neck_e)
MetricDetail.create!(description: "slight weakness (<50% loss)", score: 2, metric: neck_e)
MetricDetail.create!(description: "normal", score: 3, metric: neck_e)

ul = MetricCategory.create!(title: "Upper Limb")
sh_abd_left = Metric.create!(title: "SH ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: sh_abd_left)
MetricDetail.create!(description: "flicker", score: 1, metric: sh_abd_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: sh_abd_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: sh_abd_left)
sh_abd_left_over = MetricDetail.create!(description: "overcome", metric: sh_abd_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: sh_abd_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: sh_abd_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: sh_abd_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: sh_abd_left)
ef_abd_left = Metric.create!(title: "EF ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: ef_abd_left)
MetricDetail.create!(description: "flicker", score: 1, metric: ef_abd_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: ef_abd_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: ef_abd_left)
ef_abd_left_over= MetricDetail.create!(description: "overcome", metric: ef_abd_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: ef_abd_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: ef_abd_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: ef_abd_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: ef_abd_left)
we_abd_left = Metric.create!(title: "WE ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: we_abd_left)
MetricDetail.create!(description: "flicker", score: 1, metric: we_abd_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: we_abd_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: we_abd_left)
we_abd_left_over= MetricDetail.create!(description: "overcome", metric: we_abd_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: we_abd_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: we_abd_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: we_abd_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: we_abd_left)

sh_abd_right = Metric.create!(title: "SH ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: sh_abd_right)
MetricDetail.create!(description: "flicker", score: 1, metric: sh_abd_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: sh_abd_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: sh_abd_right)
sh_abd_right_over= MetricDetail.create!(description: "overcome", metric: sh_abd_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: sh_abd_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: sh_abd_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: sh_abd_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: sh_abd_right)
ef_abd_right = Metric.create!(title: "EF ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: ef_abd_right)
MetricDetail.create!(description: "flicker", score: 1, metric: ef_abd_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: ef_abd_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: ef_abd_right)
ef_abd_right_over= MetricDetail.create!(description: "overcome", metric: ef_abd_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: ef_abd_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: ef_abd_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: ef_abd_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: ef_abd_right)
we_abd_right = Metric.create!(title: "WE ABD", metric_category: ul)
MetricDetail.create!(description: "paralysis", score: 0, metric: we_abd_right)
MetricDetail.create!(description: "flicker", score: 1, metric: we_abd_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: we_abd_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: we_abd_right)
we_abd_right_over= MetricDetail.create!(description: "overcome", metric: we_abd_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: we_abd_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: we_abd_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: we_abd_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: we_abd_right)

turn = Metric.create!(title: "Turn Key", metric_category: ul)
MetricDetail.create!(description: "unable", score: 0, metric: turn)
MetricDetail.create!(description: "able but difficult", score: 1, metric: turn)
MetricDetail.create!(description: "able", score: 2, metric: turn)
knife = Metric.create!(title: "Knife and Fork", metric_category: ul)
MetricDetail.create!(description: "unable", score: 0, metric: knife)
MetricDetail.create!(description: "able but difficult", score: 1, metric: knife)
MetricDetail.create!(description: "able", score: 2, metric: knife)
dress = Metric.create!(title: "Dress Upper Body (excl. buttons)", metric_category: ul)
MetricDetail.create!(description: "unable", score: 0, metric: dress)
MetricDetail.create!(description: "able but difficult", score: 1, metric: dress)
MetricDetail.create!(description: "able", score: 2, metric: dress)

ll = MetricCategory.create!(title: "Lower Limb")

hf_left = Metric.create!(title: "HF", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: hf_left)
MetricDetail.create!(description: "flicker", score: 1, metric: hf_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: hf_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: hf_left)
hf_left_over = MetricDetail.create!(description: "overcome", metric: hf_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: hf_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: hf_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: hf_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: hf_left)
ke_left = Metric.create!(title: "KE", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: ke_left)
MetricDetail.create!(description: "flicker", score: 1, metric: ke_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: ke_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: ke_left)
ke_left_over= MetricDetail.create!(description: "overcome", metric: ke_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: ke_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: ke_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: ke_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: ke_left)
dorsif_left = Metric.create!(title: "Dorsifl", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: dorsif_left)
MetricDetail.create!(description: "flicker", score: 1, metric: dorsif_left)
MetricDetail.create!(description: "with gravity", score: 2, metric: dorsif_left)
MetricDetail.create!(description: "against gravity", score: 3, metric: dorsif_left)
dorsif_left_over = MetricDetail.create!(description: "overcome", metric: dorsif_left)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: dorsif_left_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: dorsif_left_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: dorsif_left_over)
MetricDetail.create!(description: "normal", score: 7, metric: dorsif_left)

hf_right = Metric.create!(title: "HF", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: hf_right)
MetricDetail.create!(description: "flicker", score: 1, metric: hf_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: hf_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: hf_right)
hf_right_over = MetricDetail.create!(description: "overcome", metric: hf_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: hf_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: hf_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: hf_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: hf_right)
ke_right = Metric.create!(title: "KE", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: ke_right)
MetricDetail.create!(description: "flicker", score: 1, metric: ke_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: ke_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: ke_right)
ke_right_over= MetricDetail.create!(description: "overcome", metric: ke_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: ke_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: ke_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: ke_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: ke_right)
dorsif_right = Metric.create!(title: "Dorsifl", metric_category: ll)
MetricDetail.create!(description: "paralysis", score: 0, metric: dorsif_right)
MetricDetail.create!(description: "flicker", score: 1, metric: dorsif_right)
MetricDetail.create!(description: "with gravity", score: 2, metric: dorsif_right)
MetricDetail.create!(description: "against gravity", score: 3, metric: dorsif_right)
dorsif_right_over = MetricDetail.create!(description: "overcome", metric: dorsif_right)
MetricSubdetail.create!(description: ">50% weakness", score: 4, metric_detail: dorsif_right_over)
MetricSubdetail.create!(description: "<50% weakness", score: 5, metric_detail: dorsif_right_over)
MetricSubdetail.create!(description: "just overcome", score: 6, metric_detail: dorsif_right_over)
MetricDetail.create!(description: "normal", score: 7, metric: dorsif_right)

stairs = Metric.create!(title: "Stairs", metric_category: ll)
MetricDetail.create!(description: "unable", score: 0, metric: stairs)
MetricDetail.create!(description: "able but difficult", score: 1, metric: stairs)
MetricDetail.create!(description: "able", score: 2, metric: stairs)
out = Metric.create!(title: "Walk outdoors", metric_category: ll)
MetricDetail.create!(description: "unable", score: 0, metric: out)
MetricDetail.create!(description: "able but difficult", score: 1, metric: out)
MetricDetail.create!(description: "able", score: 2, metric: out)
onem = Metric.create!(title: "Walk 1m", metric_category: ll)
MetricDetail.create!(description: "unable", score: 0, metric: onem)
MetricDetail.create!(description: "able but difficult", score: 1, metric: onem)
MetricDetail.create!(description: "able", score: 2, metric: onem)

sense = MetricCategory.create!(title: "Sensation")

up_left = Metric.create!(title: "Upper Limb", metric_category: sense)
MetricDetail.create!(description: ">75% affected", score: 0, metric: up_left)
MetricDetail.create!(description: "50-75% affected", score: 1, metric: up_left)
MetricDetail.create!(description: "0-50% affected", score: 2, metric: up_left)
MetricDetail.create!(description: "unaffected", score: 3, metric: up_left)
lo_left = Metric.create!(title: "Lower Limb", metric_category: sense)
MetricDetail.create!(description: ">75% affected", score: 0, metric: lo_left)
MetricDetail.create!(description: "50-75% affected", score: 1, metric: lo_left)
MetricDetail.create!(description: "0-50% affected", score: 2, metric: lo_left)
MetricDetail.create!(description: "unaffected", score: 3, metric: lo_left)

up_right = Metric.create!(title: "Upper Limb", metric_category: sense)
MetricDetail.create!(description: ">75% affected", score: 0, metric: up_right)
MetricDetail.create!(description: "50-75% affected", score: 1, metric: up_right)
MetricDetail.create!(description: "0-50% affected", score: 2, metric: up_right)
MetricDetail.create!(description: "unaffected", score: 3, metric: up_right)
lo_right = Metric.create!(title: "Lower Limb", metric_category: sense)
MetricDetail.create!(description: ">75% affected", score: 0, metric: lo_right)
MetricDetail.create!(description: "50-75% affected", score: 1, metric: lo_right)
MetricDetail.create!(description: "0-50% affected", score: 2, metric: lo_right)
MetricDetail.create!(description: "unaffected", score: 3, metric: lo_right)

pain = MetricCategory.create!(title: "Pain")
res = Metric.create!(title: "Response", metric_category: pain)
MetricDetail.create!(description: "severe", score: 0, metric: res)
MetricDetail.create!(description: "moderate", score: 1, metric: res)
MetricDetail.create!(description: "nil", score: 2, metric: res)

gbs       = Disease.create!(title: "GBS/AIDP", metric_categories: [cn, ul, ll, sense, pain], measure: combined)
gdp       = Disease.create!(title: "GDP", metric_categories: [cn, ul, ll], measure: combined)
infl_neur = Disease.create!(title: "Inflammatory Neuropathy", metric_categories: [cn, ul, ll], measure: combined)
pn        = Disease.create!(title: "PN", metric_categories: [cn, ul, ll], measure: combined)
mmn       = Disease.create!(title: "MMN", metric_categories: [cn, ul, ll], measure: combined)
infl_my   = Disease.create!(title: "Inflammatory Myopathy", metric_categories: [cn, ul, ll], measure: combined)
ibm       = Disease.create!(title: "IBM", metric_categories: [cn, ul, ll], measure: combined)
prox_my   = Disease.create!(title: "Prox Myopathy", metric_categories: [cn, ul, ll], measure: combined)
gen       = Disease.create!(title: "Gen Weakness", metric_categories: [cn, ul, ll], measure: combined)
mg        = Disease.create!(title: "MG", metric_categories: [cn, ul, ll], measure: combined)

puts "SEED: Created #{ Measure.count } Measures"
puts "SEED: Created #{ Disease.count } Diseases"
puts "SEED: Created #{ MetricCategory.count } Metric Categories"
puts "SEED: Created #{ Metric.count } Metrics"
puts "SEED: Created #{ MetricDetail.count } Metric Details"
puts "SEED: Created #{ MetricSubdetail.count } Metric Subdetails"
puts "SEEDING COMPLETE"
