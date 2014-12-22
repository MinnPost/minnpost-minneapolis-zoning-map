Map {
  background-color: transparent;
}


#zoning {
  line-color: #666666;
  line-width: 0.5;
  line-opacity: 0.5;
  polygon-opacity: 0.75;
  polygon-fill: #FFFFFF;
}

// Residential
#zoning[ZONE_CODE='R1'],
#zoning[ZONE_CODE='R1A'] {
  polygon-fill: @Greens-q1-7;
}
#zoning[ZONE_CODE='R2'],
#zoning[ZONE_CODE='R2B'] {
  polygon-fill: @Greens-q2-7;
}
#zoning[ZONE_CODE='R3'] { polygon-fill: @Greens-q3-7; }
#zoning[ZONE_CODE='R4'] { polygon-fill: @Greens-q4-7; }
#zoning[ZONE_CODE='R5'] { polygon-fill: @Greens-q5-7; }
#zoning[ZONE_CODE='R6'] { polygon-fill: @Greens-q6-7; }

// Office
#zoning[ZONE_CODE='OR1'] { polygon-fill: @Blues-q1-4; }
#zoning[ZONE_CODE='OR2'] { polygon-fill: @Blues-q2-4; }
#zoning[ZONE_CODE='OR3'] { polygon-fill: @Blues-q3-4; }

// Commerical
#zoning[ZONE_CODE='C1'] { polygon-fill: @Reds-q1-6; }
#zoning[ZONE_CODE='C2'] { polygon-fill: @Reds-q2-6; }
#zoning[ZONE_CODE='C3A'] { polygon-fill: @Reds-q3-6; }
#zoning[ZONE_CODE='C3S'] { polygon-fill: @Reds-q4-6; }
#zoning[ZONE_CODE='C4'] { polygon-fill: @Reds-q5-6; }

// Industrial
#zoning[ZONE_CODE='I1'] { polygon-fill: @Greys-q1-4; }
#zoning[ZONE_CODE='I2'] { polygon-fill: @Greys-q2-4; }
#zoning[ZONE_CODE='I3'] { polygon-fill: @Greys-q3-4; }

// Downtown
#zoning[ZONE_CODE=~'B4[-]*.*'] { polygon-fill: @Purples-q1-5; }
#zoning[ZONE_CODE=~'B4S[-]*.*'] { polygon-fill: @Purples-q2-5; }
#zoning[ZONE_CODE=~'B4C[-]*.*'] { polygon-fill: @Purples-q3-5; }
#zoning[ZONE_CODE=~'B4N[-]*.*'] { polygon-fill: @Purples-q4-5; }

