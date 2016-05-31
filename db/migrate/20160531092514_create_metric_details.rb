class CreateMetricDetails < ActiveRecord::Migration
  def change
    create_table :metric_details do |t|
      t.string :description
      t.integer :metric_id
      t.integer :score

      t.timestamps null: false
    end
  end
end
