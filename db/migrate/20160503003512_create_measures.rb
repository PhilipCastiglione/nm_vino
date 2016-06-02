class CreateMeasures < ActiveRecord::Migration
  def change
    create_table :measures do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
