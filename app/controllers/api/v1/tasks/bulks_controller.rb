class Api::V1::Tasks::BulksController < Api::V1::BaseController
  def update
    authorize! :bulk_update_tasks, current_user
    if current_user.tasks.upsert_all(task_params[:_json])
      render json: {}, status: :ok
    else
      head json: {}, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:bulk).permit(_json: [:id, :description, :completed, :position, :created_at, :updated_at])
  end
end
