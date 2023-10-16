module Api
  module V1
    class TasksController < Api::V1::BaseController
      load_and_authorize_resource

      def index
      end

      def show
      end

      def create
        if @task.save
          render :show, status: :created
        else
          render json: {message: @task.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def update
        if @task.update(task_params)
          render :show, status: :ok
        else
          render json: {message: @task.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def destroy
        @task.destroy
        render :show, status: :ok
      end

      private

      def task_params
        params.require(:task).permit(:id, :position, :description, :completed, :created_at, :updated_at)
      end
    end
  end
end
