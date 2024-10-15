#!/bin/bash

# Check if a title is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <post-title>"
  exit 1
fi

# Combine all arguments into a single title string
TITLE="$*"

# Get the current date
DATE=$(date +%Y-%m-%d)

# Format the title to be URL-friendly
FORMATTED_TITLE=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr -s ' ' '-' | tr -cd '[:alnum:]-')

# Capitalize the title
CAPITALIZED_TITLE=$(echo "$TITLE" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

# Create the file path
FILE="docs/posts/${DATE}-${FORMATTED_TITLE}.md"

# Create the file with the specified structure
cat <<EOL > "$FILE"
---
published: false
date: $DATE
title: '$CAPITALIZED_TITLE'
description: 'This is an example description for the post.'
category: dev
tags:
  - example
---
This is an example excerpt for the post, which can be used as the introduction. You can provide a brief summary of the post here.

---

## H2 Title

Blah blah blah

## H3 Title

Blah blah blah

EOL

echo "New blog post created at $FILE"
