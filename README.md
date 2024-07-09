# QrContest
This codebase is deprecated. 
However, it can be used to create QR codes for a contest.
All other features are considered deprecated.

## Code generator
The code can generate QR codes with a unique code and a link to the contest page.
Each is scaled to match A6 paper size, so 4 codes can be printed on a single page.

1. Run app using external php server
2. Adjust the data in `src/CodeGenerator.php` to generate the desired QR codes
3. Make a GET request to a `http://localhost/api/qr_generator` to generate the codes
4. Make a POST request to a `http://localhost/api/qr_generator` to generate printable pages
5. Make a DELETE request to a `http://localhost/api/qr_generator` to delete all generated files 
6. Look at `storage/app/codes` directory to get the generated files
