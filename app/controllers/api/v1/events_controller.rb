module Api
  module V1
    class EventsController < Api::V1::BaseController
      load_and_authorize_resource

      def index
        @events = @events.where("id > ?", params[:since])
      end
    end
  end
end
