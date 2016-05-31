class MetricCategory < ActiveRecord::Base
  has_many :metrics
  belongs_to :disease

  validates :title, :disease_id, presence: true
end
