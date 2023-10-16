class ApplicationController < ActionController::Base
  include ApplicationHelper
  check_authorization
  skip_authorization_check if: :devise_controller?
end
