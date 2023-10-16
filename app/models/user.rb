class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable
  has_many :tasks, dependent: :destroy
  has_one :license, autosave: true
  validates_presence_of :license, message: "is invalid"
  validates :terms_of_service, acceptance: true
  attr_reader :license_code

  def license_code=(license_code)
    l = License.unused.find_by_license(license_code)
    if l
      l.used_at = Time.now
      self.license = l
    end
  end
end
