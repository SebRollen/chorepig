class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.belongs_to :task, type: :uuid
      t.string :action
      t.json :content
      t.timestamp :created_at
    end
  end
end
