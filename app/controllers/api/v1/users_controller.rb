module Api
  module V1
    class UsersController < Api::V1::BaseController
      def show
        @user = current_user
        authorize! :read, @user
      end
    end
  end
end
