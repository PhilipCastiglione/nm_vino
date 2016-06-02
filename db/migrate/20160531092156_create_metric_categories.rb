class CreateMetricCategories < ActiveRecord::Migration
  def change
    create_table :metric_categories do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
