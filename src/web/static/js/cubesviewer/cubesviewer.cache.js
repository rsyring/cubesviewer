/*
 * CubesViewer
 * Copyright (c) 2012-2013 Jose Juan Montes, see AUTHORS for more details
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * If your version of the Software supports interaction with it remotely through
 * a computer network, the above copyright notice and this permission notice
 * shall be accessible to all users.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Cache
 */
cubesviewer.cache = {};

/*
 * Override original cubesRequest 
 */
cubesviewer.cacheOverridedCubesRequest = cubesviewer.cubesRequest;

cubesviewer.cubesRequest = function(path, params, successCallback, completeCallback, errorCallback) {
	
	// TODO: Check if cache is enabled
	
	var requestHash = path + "?" + $.param(params);
	if (requestHash in this.cache) {
		
		// TODO: Warn that data comes from cache (QTip can do this?)
		
		// TODO: What is the correct ordering of success/complete callbacks?
		successCallback(this.cache[requestHash]);
		completeCallback();
		
	} else {
		// Do request
		cubesviewer.cacheOverridedCubesRequest(path, params, this.cacheCubesRequestSuccess(successCallback, requestHash), completeCallback, errorCallback);
	}
	
}

cubesviewer.cacheCubesRequestSuccess = function(pCallback, pRequestHash) {
	var requestHash = pRequestHash;
	var callback = pCallback;
	return function(data) {
		// TODO: Check if cache is enabled
		cubesviewer.cache[pRequestHash] = data;
		pCallback(data);
	};
}
