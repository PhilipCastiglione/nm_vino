class Disease < ActiveRecord::Base
  belongs_to :measure
  has_and_belongs_to_many :metric_categories

  validates :title, presence: true
end
