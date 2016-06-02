class CreateDiseasesMetricCategoriesJoinTable < ActiveRecord::Migration
  def change
    create_table :diseases_metric_categories, id: false do |t|
      t.integer :disease_id
      t.integer :metric_category_id
    end

    add_index :diseases_metric_categories, :disease_id
    add_index :diseases_metric_categories, :metric_category_id
  end
end
