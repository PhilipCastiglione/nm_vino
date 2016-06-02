class MetricCategory < ActiveRecord::Base
  has_and_belongs_to_many :diseases
  has_many :metrics

  validates :title, presence: true
end
