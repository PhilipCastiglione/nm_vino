class Disease < ActiveRecord::Base
  has_many :metric_categories

  validates :title, presence: true
end
