"use strict";
var aws  = require("aws-sdk");
var util = require("util");
var Q    = require("q");

console.log("Loading event");

var s3 = new aws.S3({
	apiVersion : "2006-03-01"
});

exports.handler = function (event, context) {
	console.log("Received event:");
	console.log(JSON.stringify(event, null, "  "));

	// Get the object from the event and show its content type
	var bucket = event.Records[0].s3.bucket.name;
	var key = event.Records[0].s3.object.key;

	Q.ninvoke(s3, "getObject", { Bucket : bucket, Key : key })
	.catch(function () {
		console.log(util.format(
			[
				"Error getting object %s from bucket %s.",
				"Make sure they exist and your bucket is in the same region as this function."
			].join(" "),
			key,
			bucket
		));
	})
	.then(function (data) {
		console.log("CONTENT TYPE:", data.ContentType);
	})
	.nodeify(context.done);
};
