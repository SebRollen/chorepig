module Api
  module V1
    class BaseController < ApplicationController
      include ApplicationHelper
      skip_before_action :verify_authenticity_token
      rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
      rescue_from CanCan::AccessDenied, with: :unauthorized

      private

      def unauthorized
        render json: {message: "Unauthorized"}, status: :unauthorized
      end

      def handle_not_found
        render json: {message: "Record not found"}, status: :not_found
      end
    end
  end
end
