class Metric < ActiveRecord::Base
  has_many :metric_details
  belongs_to :metric_category

  validates :title, :metric_category_id, presence: true
end
