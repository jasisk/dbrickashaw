import test from 'tape'
import Path from 'path';
import Dbrickashaw from '../dist/index';


test('Dbrickashaw', function (t) {

    t.test('instance', t => {
        let name = 'dbrickashaw:' + Path.join(Path.basename(__dirname), Path.basename(__filename));
        let logger = Dbrickashaw.createLogger();
        t.ok(logger);
        t.equal(logger.name, name);
        t.end();
    });

    t.test('custom name', t => {
        let name = 'test_name';
        let tag = 'error';
        let message = 'This is an error';

        let logger = Dbrickashaw.createLogger(name);
        t.ok(logger);
        t.equal(logger.name, name);

        logger.on('log', ({ source, ts, tags, data }) => {
            t.equal(source, name);

            t.ok(typeof ts === 'number');
            t.ok(ts <= Date.now());

            t.ok(Array.isArray(tags));
            t.equal(tags[0], tag);

            t.equal(data, message);

            t.end();
        });

        logger.log(tag, message);
    });

    t.test('error', t => {
        let logger = Dbrickashaw.createLogger();

        logger.on('log', ({ source, ts, tags, data }) => {
            t.ok(source);
            t.ok(ts);

            t.ok(Array.isArray(tags));
            t.ok(tags.indexOf('foo') !== -1);
            t.ok(tags.indexOf('error') !== -1);

            t.equal(data, 'bar');
            t.end();
        });

        logger.error('foo', 'bar');
    });
});