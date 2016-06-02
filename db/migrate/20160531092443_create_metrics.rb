class CreateMetrics < ActiveRecord::Migration
  def change
    create_table :metrics do |t|
      t.string :title
      t.integer :metric_category_id

      t.timestamps null: false
    end
  end
end
