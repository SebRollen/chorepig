# app/controllers/pages_controller.rb

class PagesController < ApplicationController
  include HighVoltage::StaticPage
  skip_authorization_check

  private

  def page_finder_factory
    PageFinder
  end
end
