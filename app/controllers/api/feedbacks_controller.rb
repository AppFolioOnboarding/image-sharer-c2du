module Api
  class FeedbacksController < ApplicationController
    def create
      if params[:feedback][:name].present? && params[:feedback][:comments].present?
        render status: :ok,
               json: {
                 status: 'success',
                 message: 'Success'
               }
      else
        render status: :unprocessable_entity,
               json: {
                 status: 'danger',
                 message: 'Failure'
               }
      end
    end
  end
end
