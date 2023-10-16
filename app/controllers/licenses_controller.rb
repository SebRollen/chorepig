class LicensesController < ApplicationController
  skip_authorization_check
  layout "modal"

  def new
  end
end
