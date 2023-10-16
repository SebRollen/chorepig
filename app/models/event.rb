class Event < ApplicationRecord
  belongs_to :user
  belongs_to :task, optional: true
  enum :action, {created: "create", updated: "update", deleted: "delete"}
end
