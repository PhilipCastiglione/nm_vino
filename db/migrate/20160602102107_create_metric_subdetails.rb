class CreateMetricSubdetails < ActiveRecord::Migration
  def change
    create_table :metric_subdetails do |t|
      t.string :description
      t.integer :score
      t.integer :metric_detail_id

      t.timestamps null: false
    end
  end
end
