class StaticController < ApplicationController
  def index
    @data = get_data.to_json
  end

  def scores
    @measures = Measure.includes(diseases: { metric_categories: { metrics: { metric_details: :metric_subdetails } } })
  end

  def report
    metric_details, metric_subdetails = extract_records(params["data"].values)

    response = build_response(metric_details, metric_subdetails)
    render json: response
  end

  private

  def get_data
    data = {}
    measures = Measure.includes(diseases: { metric_categories: { metrics: { metric_details: :metric_subdetails } } })
    measures.each do |measure|
      data[:measures] ||= []
      data[:measures].push({
        id: measure.id,
        title: measure.title,
        max: measure.max,
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
            max: metric_category.max,
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

  def extract_records(data)
    metric_detail_ids = data.select { |r| r.last == 'MetricDetail' }.map { |r| r.first }
    metric_subdetail_ids = data.select { |r| r.last == 'MetricSubdetail' }.map { |r| r.first }
    [MetricDetail.where(id: metric_detail_ids), MetricSubdetail.where(id: metric_subdetail_ids)]
  end

  def build_response(metric_details, metric_subdetails)
    response = {report: {}}
    all_metrics = (metric_details + metric_subdetails.map { |ms| ms.metric_detail }).map { |md| md.metric }.uniq
    all_metric_categories = all_metrics.map { |m| m.metric_category }.uniq

    all_metric_categories.each { |mc| response[:report][mc.title] = {} }
    all_metrics.each { |m| response[:report][m.metric_category.title][m.title] = 0 }

    metric_details.each { |md| response[:report][md.metric.metric_category.title][md.metric.title] += md.score }
    metric_subdetails.each { |ms| response[:report][ms.metric_detail.metric.metric_category.title][ms.metric_detail.metric.title] += ms.score }

    response[:report].each do |mc_title, mds|
      mc_score = 0
      mds.each { |md, score| mc_score += score }
      response[:report][mc_title]["total"] = mc_score
    end

    response['total'] = (metric_details.pluck(:score) + metric_subdetails.pluck(:score)).sum

    all_metric_categories.each { |mc| response[:report][mc.title]['max'] = mc.max }

    response
  end
end
