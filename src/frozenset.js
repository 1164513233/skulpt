/**
 * @constructor
 * @param {Array.<Object>} S
 */
Sk.builtin.frozenset = function (S) {
    var it, i;
    var S_list;
    if (!(this instanceof Sk.builtin.frozenset)) {
        Sk.builtin.pyCheckArgsLen("frozenset", arguments.length, 0, 1);
        return new Sk.builtin.frozenset(S);
    }


    if (typeof(S) === "undefined") {
        S = [];
    }

    this.set_reset_();
    S_list = new Sk.builtin.list(S);
    
    for (it = Sk.abstr.iter(S_list), i = it.tp$iternext(); i !== undefined; i = it.tp$iternext()) {
        // Sk.builtin.frozenset.prototype["$add"].func_code(this, i);
        this.v.mp$ass_subscript(i, true);
    }

    this.__class__ = Sk.builtin.frozenset;

    this["v"] = this.v;
    return this;
};
Sk.abstr.setUpInheritance("frozenset", Sk.builtin.frozenset, Sk.builtin.object);
Sk.abstr.markUnhashable(Sk.builtin.frozenset);

Sk.builtin.frozenset.prototype.set_reset_ = function () {
    this.v = new Sk.builtin.dict([]);
};

Sk.builtin.frozenset.prototype["$r"] = function () {
    var it, i;
    var ret = [];
    for (it = Sk.abstr.iter(this), i = it.tp$iternext(); i !== undefined; i = it.tp$iternext()) {
        ret.push(Sk.misceval.objectRepr(i).v);
    }

    if(Sk.__future__.frozenset_repr) {
        if (ret.length === 0) {
            return new Sk.builtin.str("frozenset()");
        } else {
            return new Sk.builtin.str("frozenset({" + ret.join(", ") + "})");
        }
    } else {
        return new Sk.builtin.str("frozenset([" + ret.join(", ") + "])");
    }
};

Sk.builtin.frozenset.prototype.ob$eq = function (other) {

    if (this === other) {
        return Sk.builtin.bool.true$;
    }

    if (!(other instanceof Sk.builtin.frozenset)) {
        return Sk.builtin.bool.false$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) !==
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.false$;
    }

    return this["issubset"].func_code(this, other);
};

Sk.builtin.frozenset.prototype.ob$ne = function (other) {

    if (this === other) {
        return Sk.builtin.bool.false$;
    }

    if (!(other instanceof Sk.builtin.frozenset)) {
        return Sk.builtin.bool.true$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) !==
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.true$;
    }

    if (this["issubset"].func_code(this, other).v) {
        return Sk.builtin.bool.false$;
    } else {
        return Sk.builtin.bool.true$;
    }
};

Sk.builtin.frozenset.prototype.ob$lt = function (other) {

    if (this === other) {
        return Sk.builtin.bool.false$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) >=
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.false$;
    }

    return this["issubset"].func_code(this, other);
};

Sk.builtin.frozenset.prototype.ob$le = function (other) {

    if (this === other) {
        return Sk.builtin.bool.true$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) >
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.false$;
    }

    return this["issubset"].func_code(this, other);
};

Sk.builtin.frozenset.prototype.ob$gt = function (other) {

    if (this === other) {
        return Sk.builtin.bool.false$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) <=
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.false$;
    }

    return this["issuperset"].func_code(this, other);
};

Sk.builtin.frozenset.prototype.ob$ge = function (other) {

    if (this === other) {
        return Sk.builtin.bool.true$;
    }

    if (Sk.builtin.frozenset.prototype.sq$length.call(this) <
        Sk.builtin.frozenset.prototype.sq$length.call(other)) {
        return Sk.builtin.bool.false$;
    }

    return this["issuperset"].func_code(this, other);
};

Sk.builtin.frozenset.prototype["__iter__"] = new Sk.builtin.func(function (self) {
    Sk.builtin.pyCheckArgsLen("__iter__", arguments.length, 0, 0, false, true);
    return new Sk.builtin.frozenset_iter_(self);
});

Sk.builtin.frozenset.prototype.tp$iter = function () {
    return new Sk.builtin.frozenset_iter_(this);
};

Sk.builtin.frozenset.prototype.sq$length = function () {
    return this["v"].mp$length();
};

Sk.builtin.frozenset.prototype.sq$contains = function(ob) {
    return this["v"].sq$contains(ob);
};

Sk.builtin.frozenset.prototype["isdisjoint"] = new Sk.builtin.func(function (self, other) {
    // requires all items in self to not be in other
    var isIn;
    var it, item;

    Sk.builtin.pyCheckArgsLen("isdisjoint", arguments.length, 2, 2);
    if (!Sk.builtin.checkIterable(other)) {
        throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(other) + "' object is not iterable");
    }

    for (it = Sk.abstr.iter(self), item = it.tp$iternext(); item !== undefined; item = it.tp$iternext()) {
        isIn = Sk.abstr.sequenceContains(other, item);
        if (isIn) {
            return Sk.builtin.bool.false$;
        }
    }
    return Sk.builtin.bool.true$;
});

Sk.builtin.frozenset.prototype["issubset"] = new Sk.builtin.func(function (self, other) {
    var isIn;
    var it, item;
    var selfLength, otherLength;

    Sk.builtin.pyCheckArgsLen("issubset", arguments.length, 2, 2);
    if (!Sk.builtin.checkIterable(other)) {
        throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(other) + "' object is not iterable");
    }

    selfLength = self.sq$length();
    otherLength = other.sq$length();

    if (selfLength > otherLength) {
        // every item in this set can't be in other if it's shorter!
        return Sk.builtin.bool.false$;
    }
    for (it = Sk.abstr.iter(self), item = it.tp$iternext(); item !== undefined; item = it.tp$iternext()) {
        isIn = Sk.abstr.sequenceContains(other, item);
        if (!isIn) {
            return Sk.builtin.bool.false$;
        }
    }
    return Sk.builtin.bool.true$;
});

Sk.builtin.frozenset.prototype["issuperset"] = new Sk.builtin.func(function (self, other) {
    Sk.builtin.pyCheckArgsLen("issuperset", arguments.length, 2, 2);
    return Sk.builtin.frozenset.prototype["issubset"].func_code(other, self);
});

Sk.builtin.frozenset.prototype["union"] = new Sk.builtin.func(function (self) {
    var S, i, new_args;

    Sk.builtin.pyCheckArgsLen("union", arguments.length, 1);

    S = Sk.builtin.frozenset.prototype["copy"].func_code(self);
    new_args = [S];
    for (i = 1; i < arguments.length; i++) {
        new_args.push(arguments[i]);
    }

    Sk.builtin.frozenset.prototype["update"].func_code.apply(null, new_args);
    return S;
});

Sk.builtin.frozenset.prototype["intersection"] = new Sk.builtin.func(function (self) {
    var S, i, new_args;

    Sk.builtin.pyCheckArgsLen("intersection", arguments.length, 1);

    S = Sk.builtin.frozenset.prototype["copy"].func_code(self);
    new_args = [S];
    for (i = 1; i < arguments.length; i++) {
        new_args.push(arguments[i]);
    }

    Sk.builtin.frozenset.prototype["intersection_update"].func_code.apply(null, new_args);
    return S;
});

Sk.builtin.frozenset.prototype["difference"] = new Sk.builtin.func(function (self, other) {
    var S, i, new_args;

    Sk.builtin.pyCheckArgsLen("difference", arguments.length, 2);

    S = Sk.builtin.frozenset.prototype["copy"].func_code(self);
    new_args = [S];
    for (i = 1; i < arguments.length; i++) {
        new_args.push(arguments[i]);
    }

    Sk.builtin.frozenset.prototype["difference_update"].func_code.apply(null, new_args);
    return S;
});

Sk.builtin.frozenset.prototype["symmetric_difference"] = new Sk.builtin.func(function (self, other) {
    var it, item, S;

    Sk.builtin.pyCheckArgsLen("symmetric_difference", arguments.length, 2, 2);

    S = Sk.builtin.frozenset.prototype["union"].func_code(self, other);
    for (it = Sk.abstr.iter(S), item = it.tp$iternext(); item !== undefined; item = it.tp$iternext()) {
        if (Sk.abstr.sequenceContains(self, item) && Sk.abstr.sequenceContains(other, item)) {
            Sk.builtin.frozenset.prototype["discard"].func_code(S, item);
        }
    }
    return S;
});

Sk.builtin.frozenset.prototype["copy"] = new Sk.builtin.func(function (self) {
    Sk.builtin.pyCheckArgsLen("copy", arguments.length, 1, 1);
    return new Sk.builtin.frozenset(self);
});

Sk.exportSymbol("Sk.builtin.frozenset", Sk.builtin.frozenset);

/**
 * @constructor
 * @param {Object} obj
 */
Sk.builtin.frozenset_iter_ = function (obj) {
    var allkeys, k, i, bucket, buckets;
    if (!(this instanceof Sk.builtin.frozenset_iter_)) {
        return new Sk.builtin.frozenset_iter_(obj);
    }
    this.$obj = obj;
    this.tp$iter = this;
    allkeys = [];
    buckets = obj.v.buckets;
    for (k in buckets) {
        if (buckets.hasOwnProperty(k)) {
            bucket = buckets[k];
            if (bucket && bucket.$hash !== undefined && bucket.items !== undefined) {
                // skip internal stuff. todo; merge pyobj and this
                for (i = 0; i < bucket.items.length; i++) {
                    allkeys.push(bucket.items[i].lhs);
                }
            }
        }
    }
    this.$index = 0;
    this.$keys = allkeys;
    this.tp$iternext = function () {
        if (this.$index >= this.$keys.length) {
            return undefined;
        }
        return this.$keys[this.$index++];
    };
    this.$r = function () {
        return new Sk.builtin.str("setiterator");
    };
    return this;
};

Sk.builtin.frozenset.prototype.__contains__ = new Sk.builtin.func(function(self, item) {
    Sk.builtin.pyCheckArgsLen("__contains__", arguments.length, 2, 2);
    return new Sk.builtin.bool(self.sq$contains(item));
});

Sk.abstr.setUpInheritance("setiterator", Sk.builtin.frozenset_iter_, Sk.builtin.object);

Sk.builtin.frozenset_iter_.prototype.__class__ = Sk.builtin.frozenset_iter_;

Sk.builtin.frozenset_iter_.prototype.__iter__ = new Sk.builtin.func(function (self) {
    Sk.builtin.pyCheckArgsLen("__iter__", arguments.length, 0, 0, true, false);
    return self;
});

Sk.builtin.frozenset_iter_.prototype.next$ = function (self) {
    var ret = self.tp$iternext();
    if (ret === undefined) {
        throw new Sk.builtin.StopIteration();
    }
    return ret;
};
