class StaticController < ApplicationController
  def index
    @data = get_data.to_json
  end

  def scores
  end

  private

  def get_data
    data = {}
    Measure.all.each do |measure|
      data[:measures] ||= []
      data[:measures].push({
        id: measure.id,
        title: measure.title,
        diseases: []
      })
      measure.diseases.each do |disease|
        current_measure = matching(data[:measures], measure)
        current_measure[:diseases].push({
          id: disease.id,
          title: disease.title,
          metric_categories: []
        })
        disease.metric_categories.each do |metric_category|
          current_disease = matching(current_measure[:diseases], disease)
          current_disease[:metric_categories].push({
            id: metric_category.id,
            title: metric_category.title,
            metrics: []
          })
          metric_category.metrics.each do |metric|
            current_metric_category = matching(current_disease[:metric_categories], metric_category)
            current_metric_category[:metrics].push({
              id: metric.id,
              title: metric.title,
              metric_details: []
            })
            metric.metric_details.each do |metric_detail|
              current_metric = matching(current_metric_category[:metrics], metric)
              current_metric[:metric_details].push({
                id: metric_detail.id,
                description: metric_detail.description,
                score: metric_detail.score,
                metric_subdetails: []
              })
              metric_detail.metric_subdetails.each do |metric_subdetail|
                current_metric_detail = matching(current_metric[:metric_details], metric_detail)
                current_metric_detail[:metric_subdetails].push({
                  id: metric_subdetail.id,
                  description: metric_subdetail.description,
                  score: metric_subdetail.score
                })
              end
            end
          end
        end
      end
    end
    data
  end

  def matching(arr, record)
    arr.select { |i| i[:id] == record.id }.first
  end
end
