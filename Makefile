###
# Make file for project.
#
# Downloads, filters, and converts data
#
###

# Directories
current_dir = $(shell pwd)
data := data
original := $(data)/original
build := $(data)/build
processing := $(data)/processing
tilemill := $(data)/tilemill
mapbox_home := ~/Documents/Mapbox

# Sources.  This is actually a redirect.
source_zoning := http://opendata.minneapolismn.gov/datasets/eac15cee3f2d4ec4887e1f8995955ef1_0.geojson

# Local sources
local_zoning := $(original)/minneapolis-zoning.geo.json

# Tilemill and mapbox
tilemill_zoning := minnpost-minneapolis-zoning-map
tilemill_data_zoning := $(tilemill)/$(tilemill_zoning)/layers/minneapolis-zoning.geo.json
mapbox_zoning := $(mapbox_home)/project/$(tilemill_zoning)


# Download and unzip sources.
$(local_zoning):
	mkdir -p $(original)
	curl -L -o $(local_zoning) "$(source_zoning)"

download: $(local_zoning)
clean_download:
	rm -rv $(original)/*


# Make links
$(mapbox_zoning): $(local_zoning)
	ln -s $(current_dir)/$(tilemill)/$(tilemill_zoning) $(mapbox_zoning)

$(tilemill_data_zoning): $(local_zoning)
	ln -s ../../../../$(local_zoning) $(tilemill_data_zoning)

link: $(mapbox_zoning) $(tilemill_data_zoning)
clean_link:
	rm -v $(mapbox_zoning) $(tilemill_data_zoning)



# General
all: link
clean: clean_link clean_download
