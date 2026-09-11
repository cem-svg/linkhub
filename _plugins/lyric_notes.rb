require "cgi"

# Renders the inline "highlight + citation" markup used inside a lyric line.
#
# In a song's front matter you write a line like:
#   orig: "Mi [[ncrisciu|ncrisciu]] di stu munnu"
#
# `[[phrase|note_id]]` becomes a clickable/tappable <mark> element; the
# actual explanation text lives in that song's `notes:` map (keyed by the
# same id) and is rendered separately as JSON so it can be shown in a small
# popover by assets/lyrics.js. Everything outside the [[...]] markers is
# HTML-escaped so lyrics can contain plain punctuation safely.
module Jekyll
  module LyricNotesFilter
    MARK_PATTERN = /\[\[(.+?)\|(.+?)\]\]/

    def lyric_markup(text)
      return "" if text.nil?
      str = text.to_s
      out = +""
      last = 0

      str.scan(MARK_PATTERN) do
        m = Regexp.last_match
        phrase, note_id = m[1], m[2]
        out << CGI.escapeHTML(str[last...m.begin(0)])
        safe_phrase = CGI.escapeHTML(phrase.strip)
        safe_id = CGI.escapeHTML(note_id.strip)
        out << %(<mark class="lyric-note" tabindex="0" role="button" ) \
             << %(aria-haspopup="true" data-note-id="#{safe_id}">#{safe_phrase}</mark>)
        last = m.end(0)
      end

      out << CGI.escapeHTML(str[last..-1] || "")
      out
    end
  end
end

Liquid::Template.register_filter(Jekyll::LyricNotesFilter)
