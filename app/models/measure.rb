class Measure < ActiveRecord::Base
  has_many :diseases

  validates :title, presence: true
end
