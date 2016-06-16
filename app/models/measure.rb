class Measure < ActiveRecord::Base
  has_many :diseases

  def max
    metric_categories = diseases.map do |d|
      d.metric_categories
    end.flatten.uniq
    metric_categories.map do |mc|
      mc.metrics.map do |m|
        m.metric_details.map do |md|
          md.score || md.metric_subdetails.pluck(:score).max
        end.max
      end.sum
    end.sum
  end

  validates :title, presence: true
end
