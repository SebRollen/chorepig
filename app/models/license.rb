class License < ApplicationRecord
  encrypts :license, deterministic: true
  belongs_to :user, optional: true
  scope :unused, -> { where(used_at: nil) }
end
