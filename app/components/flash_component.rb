# frozen_string_literal: true

class FlashComponent < ApplicationComponent
  include HeroiconHelper
  # https://petr.codes/blog/rails/modern-rails-flash-messages/part-1/
  def initialize(type:, data:)
    @type = type
    @data = prepare_data(data)
    @icon = icon
    @icon_color = icon_color

    @data[:timeout] ||= 3
  end

  def icon
    case @type
    when "success"
      heroicon("check-circle", variant: :solid)
    when "info", "notice"
      heroicon("information-circle", variant: :solid)
    when "warn", "alert"
      heroicon("exclamation-circle", variant: :solid)
    when "error"
      heroicon("x-circle", variant: :solid)
    end
  end

  def icon_color
    case @type
    when "success"
      "text-green-400"
    when "info", "notice"
      "text-blue-400"
    when "warn", "alert"
      "text-yellow-400"
    when "error"
      "text-red-400"
    end
  end

  private

  def prepare_data(data)
    case data
    when Hash
      # Rails seems to convert the keys to strings here. We need them as symbols, so we remap
      data.transform_keys(&:to_sym)
    else
      {title: data}
    end
  end
end
