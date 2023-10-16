class Task < ApplicationRecord
  has_many :events
  belongs_to :user
  acts_as_list scope: :user
  validates :description, presence: true
  after_create :save_create_event
  after_update :save_update_event
  before_destroy :save_delete_event

  private

  def save_create_event
    events.create(user: user, action: :created, content: attributes.except("user_id"))
  end

  def save_update_event
    content = previous_changes.transform_values(&:last)
    events.create(user: user, action: :updated, content: content)
  end

  def save_delete_event
    events.create(user: user, action: :deleted, content: {})
  end
end
