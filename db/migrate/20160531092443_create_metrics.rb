class CreateMetrics < ActiveRecord::Migration
  def change
    create_table :metrics do |t|
      t.string :description
      t.integer :metric_category_id
      t.integer :score

      t.timestamps null: false
    end
  end
end
