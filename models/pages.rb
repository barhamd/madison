class Page
  #TODO Add a 'savename' field. Every keystroke can be saved as a new page, but when
  # the submit button is hit it 'saves'. Madison could then view ALL of her
  # history if she needs to, or just the 'saved' ones.

  include DataMapper::Resource
  property :id,         Serial
  property :html,       Text
  property :css,        Text
  property :created_at, DateTime
end
