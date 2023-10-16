class CreateLicenses < ActiveRecord::Migration[7.0]
  def change
    create_table :licenses do |t|
      t.text :license, null: false
      t.timestamp :used_at
      t.references :user, null: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
