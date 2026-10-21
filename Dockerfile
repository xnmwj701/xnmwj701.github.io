FROM ruby:3.4-bookworm

WORKDIR /site

# Keep the Linux lockfile inside the image; the mounted Windows checkout stays untouched.
COPY Gemfile Gemfile.lock /opt/jekyll/
ENV BUNDLE_GEMFILE=/opt/jekyll/Gemfile
RUN bundle lock --add-platform x86_64-linux && bundle install

EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--watch", "--force_polling"]

