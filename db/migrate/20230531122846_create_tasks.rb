class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :description
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.boolean :completed
      t.integer :position

      t.timestamps
    end
  end
end
