class AddUserIdToEvents < ActiveRecord::Migration[7.0]
  def change
    add_belongs_to :events, :user, type: :uuid
  end
end
