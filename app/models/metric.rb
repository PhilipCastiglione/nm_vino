class Metric < ActiveRecord::Base
  has_many :metric_details
  belongs_to :metric_category

  validates :description, :metric_category_id, presence: true
  validate :score_or_metric_details_present

  def score_or_metric_details_present
    if score.nil? && metric_details.empty?
      errors.add(:score, "score or metric details required")
      errors.add(:metric_details, "score or metric details required")
    end
  end
end
