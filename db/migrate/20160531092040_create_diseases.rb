class CreateDiseases < ActiveRecord::Migration
  def change
    create_table :diseases do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
